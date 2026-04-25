# LQD Templates Refactor

ไฟล์ชุดนี้แยก Navbar และ Sidebar ออกเป็นไฟล์กลางแล้ว:

- `partials/navbar.html`
- `partials/sidebar.html`

หน้าที่แก้แล้วจะใช้:

```jinja2
{% set active_page = "customer-list" %}
{% include "partials/navbar.html" %}
{% include "partials/sidebar.html" %}
```

ค่า `active_page` ที่ใช้:

- `customer-list` สำหรับ `customer-list.html`, `customer-detail.html`, `customer-add.html`
- `payment-record` สำหรับ `payment-record.html`
- `data-import` สำหรับ `data-import.html`
- `report` สำหรับ `report.html`

หมายเหตุ: ต้องวางโฟลเดอร์ `partials` ไว้ใต้ `templates/partials/` และ render หน้า HTML ผ่าน Flask/Jinja ด้วย `render_template()`
