def to_float(value):
    try:
        return float(value or 0)
    except (TypeError, ValueError):
        return 0.0


def calculate_judgment_difference(customer):
    return round(
        to_float(customer.get('court_fee')) +
        to_float(customer.get('lawyer_fee')) +
        to_float(customer.get('total_debt')) -
        to_float(customer.get('principal')),
        2
    )


def with_judgment_difference(customer):
    data = dict(customer)
    data['judgment_difference'] = calculate_judgment_difference(data)
    return data
