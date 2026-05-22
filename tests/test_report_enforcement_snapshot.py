import unittest

from app.services.report_service import (
    _build_customer_as_of_report_date,
    _build_report30_row_from_db,
    _future_effective_reason,
    _get_report_group,
)


class ReportEnforcementSnapshotTests(unittest.TestCase):
    def test_future_enforcement_rolls_back_to_default_judgment_for_report30(self):
        customer = {
            'account_no': 'A-30',
            'case_status': 'บังคับคดี',
            'filing_date': '2026-01-01',
            'judgment_date': '2026-02-01',
            'enforcement_judgment_date': '2026-04-16',
            'total_debt': 100,
            '_case_status_logs': [
                {
                    'from_status': 'พิพากษาฝ่ายเดียว',
                    'to_status': 'บังคับคดี',
                },
            ],
        }

        customer_as_of = _build_customer_as_of_report_date(customer, '2026-03-31')

        self.assertEqual(customer['case_status'], 'บังคับคดี')
        self.assertEqual(customer_as_of['case_status'], 'พิพากษาฝ่ายเดียว')
        self.assertFalse(_future_effective_reason(customer_as_of, '2026-03-31'))
        self.assertEqual(
            customer_as_of['_snapshot_rollback_reason'],
            'ENFORCEMENT_AFTER_REPORT_DATE',
        )

        row = _build_report30_row_from_db(
            customer_as_of['account_no'],
            customer_as_of['case_status'],
            customer_as_of['filing_date'],
            100,
            customer_as_of,
            {'principal_bal': 100, 'remaining_debt_raw': 100},
            '2026-03-31',
            payments=[],
        )
        self.assertEqual(row['report30_note_2'], 'พิพากษาฝ่ายเดียว')

    def test_future_enforcement_rolls_back_to_consent_judgment_for_report31(self):
        customer = {
            'account_no': 'A-31',
            'case_status': 'บังคับคดี',
            'filing_date': '2026-01-01',
            'judgment_date': '2026-02-01',
            'enforcement_judgment_date': '2026-04-16',
            '_case_status_logs': [
                {
                    'from_status': 'พิพากษาตามยอม',
                    'to_status': 'บังคับคดี',
                },
            ],
        }

        customer_as_of = _build_customer_as_of_report_date(customer, '2026-03-31')

        self.assertEqual(customer_as_of['case_status'], 'พิพากษาตามยอม')
        self.assertFalse(_future_effective_reason(customer_as_of, '2026-03-31'))
        self.assertEqual(_get_report_group(customer_as_of, {'principal_bal': 100}), '31')

    def test_enforcement_effective_by_report_date_stays_enforcement(self):
        customer = {
            'case_status': 'บังคับคดี',
            'enforcement_judgment_date': '2026-03-20',
            '_case_status_logs': [
                {
                    'from_status': 'พิพากษาฝ่ายเดียว',
                    'to_status': 'บังคับคดี',
                },
            ],
        }

        self.assertIs(_build_customer_as_of_report_date(customer, '2026-03-31'), customer)
        self.assertEqual(customer['case_status'], 'บังคับคดี')

    def test_future_judgment_reason_is_preserved_after_rollback_gate(self):
        reason = _future_effective_reason(
            {
                'case_status': 'พิพากษาฝ่ายเดียว',
                'filing_date': '2026-01-01',
                'judgment_date': '2026-04-10',
            },
            '2026-03-31',
        )

        self.assertEqual(reason[0], 'JUDGMENT_DATE_AFTER_REPORT')

    def test_future_filing_reason_is_preserved(self):
        reason = _future_effective_reason(
            {
                'case_status': 'ยื่นฟ้อง',
                'filing_date': '2026-04-01',
            },
            '2026-03-31',
        )

        self.assertEqual(reason[0], 'FILING_DATE_AFTER_REPORT')


if __name__ == '__main__':
    unittest.main()
