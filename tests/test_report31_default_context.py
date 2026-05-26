import unittest

from app.services.report_service import (
    REPORT31_HEADERS,
    build_report31_export_values,
    _build_report31_row,
    _calculate_report30_default_context,
    _calculate_report31_default_context,
)


def make_customer(first_due_date, installment_count=4, installment_amount=5000):
    return {
        'account_no': 'R31-1',
        'case_status': 'พิพากษาตามยอม',
        'filing_date': '2026-01-01',
        'judgment_date': '2026-02-01',
        'principal': 100000,
        'total_debt': 100000,
        'court_fee': 0,
        'lawyer_fee': 0,
        'interest_rate': 0,
        'default_interest_rate': 0,
        'installment_count': installment_count,
        'first_due_date': first_due_date,
        'installment_1': installment_amount,
        'installment_2': 0,
        'installment_3': 0,
        'installment_4': 0,
    }


class Report31DefaultContextTests(unittest.TestCase):
    def test_mid_month_due_unpaid_at_month_end(self):
        context = _calculate_report31_default_context(
            make_customer('2026-03-15'),
            [],
            '2026-03-31',
        )

        self.assertEqual(context['amount_past_due'], 5000)
        self.assertEqual(context['dpd'], 16)
        self.assertEqual(context['default_date'], '2026-03-16')

    def test_mid_month_due_paid_before_month_end(self):
        context = _calculate_report31_default_context(
            make_customer('2026-03-15'),
            [{'payment_date': '2026-03-20', 'amount': 5000}],
            '2026-03-31',
        )

        self.assertEqual(context['amount_past_due'], 0)
        self.assertEqual(context['dpd'], 0)
        self.assertIsNone(context['default_date'])

    def test_end_month_due_unpaid_on_same_day_is_not_overdue(self):
        context = _calculate_report31_default_context(
            make_customer('2026-06-30'),
            [],
            '2026-06-30',
        )

        self.assertEqual(context['amount_past_due'], 0)
        self.assertEqual(context['dpd'], 0)
        self.assertIsNone(context['default_date'])

    def test_end_month_due_paid_on_next_month_report_date(self):
        context = _calculate_report31_default_context(
            make_customer('2026-03-31'),
            [{'payment_date': '2026-04-30', 'amount': 5000}],
            '2026-04-30',
        )

        self.assertEqual(context['amount_past_due'], 0)
        self.assertEqual(context['dpd'], 0)
        self.assertIsNone(context['default_date'])

    def test_multiple_end_month_dues_unpaid_across_months(self):
        context = _calculate_report31_default_context(
            make_customer('2026-03-31', installment_count=4),
            [],
            '2026-05-31',
        )

        self.assertEqual(context['amount_past_due'], 15000)
        self.assertEqual(context['dpd'], 61)
        self.assertEqual(context['default_date'], '2026-04-01')

    def test_historical_default_clears_after_all_default_buckets_are_paid(self):
        context = _calculate_report31_default_context(
            make_customer('2026-06-30', installment_count=3),
            [{'payment_date': '2026-08-31', 'amount': 10000}],
            '2026-08-31',
        )

        self.assertEqual(context['amount_past_due'], 0)
        self.assertEqual(context['dpd'], 0)
        self.assertIsNone(context['default_date'])

    def test_new_default_uses_current_oldest_default_bucket_after_payment(self):
        context = _calculate_report31_default_context(
            make_customer('2026-06-30', installment_count=3),
            [{'payment_date': '2026-08-31', 'amount': 5000}],
            '2026-08-31',
        )

        self.assertEqual(context['amount_past_due'], 10000)
        self.assertEqual(context['dpd'], 31)
        self.assertEqual(context['default_date'], '2026-08-01')

    def test_end_month_sequence_resets_default_after_fifo_clearing_payment(self):
        cus = make_customer('2026-01-31', installment_count=7, installment_amount=1000)

        scenarios = [
            ('2026-01-31', [], 0, 0, None),
            ('2026-02-28', [{'payment_date': '2026-02-28', 'amount': 2000}], 0, 0, None),
            ('2026-03-31', [{'payment_date': '2026-02-28', 'amount': 2000}], 0, 0, None),
            ('2026-04-30', [{'payment_date': '2026-02-28', 'amount': 2000}], 2000, 30, '2026-04-01'),
            (
                '2026-05-31',
                [
                    {'payment_date': '2026-02-28', 'amount': 2000},
                    {'payment_date': '2026-05-31', 'amount': 2000},
                ],
                0,
                0,
                None,
            ),
            (
                '2026-06-30',
                [
                    {'payment_date': '2026-02-28', 'amount': 2000},
                    {'payment_date': '2026-05-31', 'amount': 2000},
                ],
                2000,
                30,
                '2026-06-01',
            ),
            (
                '2026-07-31',
                [
                    {'payment_date': '2026-02-28', 'amount': 2000},
                    {'payment_date': '2026-05-31', 'amount': 2000},
                ],
                3000,
                61,
                '2026-06-01',
            ),
        ]

        for report_date, payments, amount_past_due, dpd, default_date in scenarios:
            with self.subTest(report_date=report_date):
                context = _calculate_report31_default_context(cus, payments, report_date)
                self.assertEqual(context['amount_past_due'], amount_past_due)
                self.assertEqual(context['dpd'], dpd)
                self.assertEqual(context['default_date'], default_date)

    def test_report30_consent_context_uses_same_current_installment_default(self):
        context = _calculate_report30_default_context(
            make_customer('2026-01-31', installment_count=7, installment_amount=1000),
            [{'payment_date': '2026-02-28', 'amount': 2000}],
            '2026-04-30',
        )

        self.assertEqual(context['default_date'], '2026-04-01')
        self.assertEqual(context['current_dpd_days'], 30)
        self.assertEqual(context['current_oldest_default_due_date'], '2026-03-31')

    def test_report31_row_uses_new_frequency_and_fields(self):
        row = _build_report31_row(
            'R31-1',
            make_customer('2026-03-15'),
            {'principal_bal_raw': 10000.9, 'acc_interest_raw': 2.5, 'ncb_months': '31'},
            '2026-03-31',
            payments=[],
        )

        self.assertEqual(row['installment_frequency'], '3')
        self.assertEqual(row['restructure_code'], '02')
        self.assertEqual(row['debt_of_last_debt_restructuring'], '2026-02-01')
        self.assertEqual(row['amount_past_due'], 5000)
        self.assertEqual(row['dpd'], 16)
        self.assertEqual(row['default_date'], '2026-03-16')

    def test_report31_export_values_use_required_column_positions(self):
        row = {
            'account_no': 'ABC-123',
            'amount_owed': 10000.99,
            'amount_past_due': 7000.75,
            'dpd': 16,
            'default_date': '2026-03-15',
            'installment_frequency': '3',
            'installment_amount': 5000.25,
            'installment_count': 24,
            'restructure_code': '02',
            'debt_of_last_debt_restructuring': '2026-02-01',
            'maturity_date': '2028-02-15',
            'report31_litigation_remark': 'retroactive litigation correction',
        }
        values = build_report31_export_values(
            row,
            lambda v: ''.join(ch for ch in str(v) if ch.isdigit()) or '-',
            lambda v, default='': str(v).replace('-', '') if v else default,
            lambda v, decimals=0: int(float(v or 0)),
        )

        expected_headers = [
            'PN segment identifier',
            'Family Name1',
            'First Name',
            'Date of birth',
            'Customer Type',
            'ID segment identifier',
            'ID Type',
            'ID Number',
            'PA Segment Identifier',
            'Issue Country',
            'Address 1',
            'Address 2',
            'Address 3',
            'Subdistrict',
            'District',
            'Province',
            'Country',
            'Postal code',
            'TL Segment Identifier',
            'Current / New Member Code',
            'Current / New Member Name',
            'Current / New Account number',
            'Account Type',
            'Currency code',
            'Date Account Opened',
            'Date Of Last Payment',
            'Amount Owed',
            'Amount Past Due',
            'Days Number Of Days Past Due',
            'Default Date',
            'Installment Frequency',
            'Installment Amount',
            'Installment Number of Payment',
            'Account Status',
            'Restructure Code',
            'Loan Objective',
            'Debt of Last Debt Restructuring',
            'Percent Payment',
            'Type Of Unit',
            'Make of Goods',
            'Model Number',
            'Chassis Number',
            'Maturity date',
            'Branch code',
            'Payment Terms',
            'Title',
            'Collateral Id',
            'Old Loan Account Number',
            'First Payment Date',
            'Status',
            'Reason Description',
            'วันที่พิพากษา',
            'ยอดหนี้พิพากษา',
            'หมายเหตุ Litigation',
        ]

        self.assertEqual(REPORT31_HEADERS, expected_headers)
        self.assertEqual(len(values), 54)
        self.assertEqual(values[21], '123')
        self.assertEqual(REPORT31_HEADERS[26], 'Amount Owed')
        self.assertEqual(REPORT31_HEADERS[27], 'Amount Past Due')
        self.assertEqual(REPORT31_HEADERS[28], 'Days Number Of Days Past Due')
        self.assertEqual(REPORT31_HEADERS[29], 'Default Date')
        self.assertEqual(REPORT31_HEADERS[30], 'Installment Frequency')
        self.assertEqual(REPORT31_HEADERS[31], 'Installment Amount')
        self.assertEqual(REPORT31_HEADERS[32], 'Installment Number of Payment')
        self.assertEqual(REPORT31_HEADERS[34], 'Restructure Code')
        self.assertEqual(REPORT31_HEADERS[36], 'Debt of Last Debt Restructuring')
        self.assertEqual(REPORT31_HEADERS[42], 'Maturity date')
        self.assertEqual(REPORT31_HEADERS[-1], 'หมายเหตุ Litigation')

        self.assertEqual(values[0], '')
        self.assertEqual(values[26], 10000)
        self.assertEqual(values[27], 7000)
        self.assertEqual(values[28], 16)
        self.assertEqual(values[29], '20260315')
        self.assertEqual(values[30], '3')
        self.assertEqual(values[31], 5000)
        self.assertEqual(values[32], 24)
        self.assertEqual(values[34], '02')
        self.assertEqual(values[36], '20260201')
        self.assertEqual(values[42], '20280215')
        self.assertEqual(values[-1], 'retroactive litigation correction')

    def test_report31_export_default_date_falls_back_when_no_default(self):
        values = build_report31_export_values(
            {'account_no': 'ABC-123', 'amount_owed': 10000, 'amount_past_due': 0, 'dpd': 0},
            lambda v: ''.join(ch for ch in str(v) if ch.isdigit()) or '-',
            lambda v, default='': str(v).replace('-', '') if v else default,
            lambda v, decimals=0: int(float(v or 0)),
        )

        self.assertEqual(values[27], 0)
        self.assertEqual(values[28], 0)
        self.assertEqual(values[29], '19000101')


if __name__ == '__main__':
    unittest.main()
