import re


EMPLOYEE_ID_RE = re.compile(r'^[A-Z0-9]{3,20}$')
USERNAME_RE = re.compile(r'^[A-Za-z0-9._-]{3,50}$')
EMAIL_RE = re.compile(r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
NAME_RE = re.compile(r"^[A-Za-zก-ฮะ-์.' -]{1,80}$")


def normalize_user_fields(data):
    data = data or {}
    return {
        'first_name': str(data.get('first_name') or '').strip(),
        'last_name': str(data.get('last_name') or '').strip(),
        'employee_id': str(data.get('employee_id') or '').strip().upper(),
        'email': str(data.get('email') or '').strip().lower(),
        'username': str(data.get('username') or '').strip(),
        'role': str(data.get('role') or 'user').strip().lower(),
    }


def validate_user_fields(data, require_role=True):
    values = normalize_user_fields(data)
    errors = []

    if not values['first_name']:
        errors.append('First name is required.')
    elif not NAME_RE.fullmatch(values['first_name']):
        errors.append('First name contains unsupported characters.')

    if not values['last_name']:
        errors.append('Last name is required.')
    elif not NAME_RE.fullmatch(values['last_name']):
        errors.append('Last name contains unsupported characters.')

    if not values['employee_id']:
        errors.append('Employee ID is required.')
    elif not EMPLOYEE_ID_RE.fullmatch(values['employee_id']):
        errors.append('Employee ID must contain only A-Z and 0-9, length 3-20.')

    if not values['email']:
        errors.append('Email is required.')
    elif not EMAIL_RE.fullmatch(values['email']):
        errors.append('Email format is invalid.')

    if not values['username']:
        errors.append('Username is required.')
    elif not USERNAME_RE.fullmatch(values['username']):
        errors.append('Username must contain only letters, numbers, dot, underscore, or hyphen, length 3-50.')

    if require_role and values['role'] not in {'user', 'admin'}:
        errors.append('Role must be user or admin.')

    return values, errors
