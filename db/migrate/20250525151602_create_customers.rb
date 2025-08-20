class CreateCustomers < ActiveRecord::Migration[8.0]
  def change
    create_table :customers do |t|
      t.date :purchasing_date
      t.string :name
      t.string :bought_item
      t.decimal :price
      t.integer :phone

      t.timestamps
    end
  end
end
