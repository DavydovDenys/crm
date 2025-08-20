# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_08_03_130930) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "customers", force: :cascade do |t|
    t.date "purchasing_date"
    t.string "name"
    t.string "bought_item"
    t.decimal "price"
    t.integer "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.integer "weight"
    t.decimal "price"
    t.decimal "service_fee"
    t.decimal "country_fee"
    t.decimal "total"
    t.bigint "package_id"
    t.bigint "lot_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "customer_id"
    t.decimal "internal_shipping_costs"
    t.decimal "country_shipping_costs"
    t.string "code"
    t.index ["customer_id"], name: "index_items_on_customer_id"
    t.index ["lot_id"], name: "index_items_on_lot_id"
    t.index ["package_id"], name: "index_items_on_package_id"
  end

  create_table "lots", force: :cascade do |t|
    t.string "code", null: false
    t.bigint "package_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["package_id"], name: "index_lots_on_package_id"
  end

  create_table "packages", force: :cascade do |t|
    t.integer "weight"
    t.decimal "items_price"
    t.decimal "shipping_cost"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "shipping_cost_per_gram"
  end

  add_foreign_key "items", "customers"
  add_foreign_key "items", "lots"
  add_foreign_key "items", "packages"
  add_foreign_key "lots", "packages"
end
