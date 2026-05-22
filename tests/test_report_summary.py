import unittest

from app.routes.reports import build_reconcile_summary


class ReportSummaryTests(unittest.TestCase):
    def test_report30_summary_keeps_case_status_breakdown(self):
        summary = build_reconcile_summary(
            3,
            [
                {'case_status': 'filing'},
                {'case_status': 'default_judgment'},
                {'case_status': 'enforcement'},
            ],
            [],
            [],
            [],
            [],
            [],
        )

        self.assertEqual(summary['report_30'], 3)
        self.assertEqual(summary['report_30_status_counts'], {
            'filing': 1,
            'default_judgment': 1,
            'enforcement': 1,
        })


if __name__ == '__main__':
    unittest.main()
