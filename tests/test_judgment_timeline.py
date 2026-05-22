import unittest

from app.routes.customers import _validate_judgment_timeline
from app.routes.imports import validate_judgment_timeline


class JudgmentTimelineValidationTests(unittest.TestCase):
    def test_consent_judgment_allows_first_due_date_on_judgment_date(self):
        for validate in (_validate_judgment_timeline, validate_judgment_timeline):
            with self.subTest(validate=validate.__module__):
                validate(
                    '2026-01-01',
                    'พิพากษาตามยอม',
                    '2026-02-18',
                    '2026-02-18',
                )

    def test_judgment_rejects_first_due_date_before_judgment_date(self):
        for judgment_type in ('พิพากษาตามยอม', 'พิพากษาฝ่ายเดียว'):
            for validate in (_validate_judgment_timeline, validate_judgment_timeline):
                with self.subTest(judgment_type=judgment_type, validate=validate.__module__):
                    with self.assertRaisesRegex(ValueError, 'วันครบกำหนดงวดแรกต้องไม่น้อยกว่า'):
                        validate(
                            '2026-01-01',
                            judgment_type,
                            '2026-02-18',
                            '2026-02-17',
                        )


if __name__ == '__main__':
    unittest.main()
