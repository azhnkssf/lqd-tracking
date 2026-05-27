import unittest

from app.services.judgment_service import calculate_judgment_difference


class JudgmentDifferenceTests(unittest.TestCase):
    def test_total_debt_greater_than_principal_includes_positive_excess_and_fees(self):
        self.assertEqual(calculate_judgment_difference({
            'total_debt': 45000,
            'principal': 40000,
            'court_fee': 1000,
            'lawyer_fee': 1000,
        }), 7000)

    def test_total_debt_equals_principal_returns_fees_only(self):
        self.assertEqual(calculate_judgment_difference({
            'total_debt': 40000,
            'principal': 40000,
            'court_fee': 1000,
            'lawyer_fee': 1000,
        }), 2000)

    def test_total_debt_less_than_principal_does_not_reduce_fees(self):
        self.assertEqual(calculate_judgment_difference({
            'total_debt': 39900,
            'principal': 40000,
            'court_fee': 200,
            'lawyer_fee': 200,
        }), 400)

    def test_total_debt_less_than_principal_without_fees_is_zero(self):
        self.assertEqual(calculate_judgment_difference({
            'total_debt': 39900,
            'principal': 40000,
            'court_fee': 0,
            'lawyer_fee': 0,
        }), 0)

    def test_empty_values_are_treated_as_zero(self):
        self.assertEqual(calculate_judgment_difference({
            'total_debt': '',
            'principal': None,
            'court_fee': '100.25',
            'lawyer_fee': None,
        }), 100.25)


if __name__ == '__main__':
    unittest.main()
