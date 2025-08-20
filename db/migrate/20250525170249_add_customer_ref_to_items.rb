class AddCustomerRefToItems < ActiveRecord::Migration[8.0]
  def change
    add_reference :items, :customer, null: true, foreign_key: true
  end
end
