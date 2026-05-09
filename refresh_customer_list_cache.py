from app import create_app
from app.database import get_db
from app.services.customer_list_cache_service import refresh_all_customer_list_cache


app = create_app()

with app.app_context():
    result = refresh_all_customer_list_cache(db=get_db())
    print(result)
