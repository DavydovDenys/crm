class AddAdditionalFieldsToItems < ActiveRecord::Migration[8.0]
  def change
    add_column :items, :country_shipping_costs, :decimal
    add_column :items, :code, :string
  end
end
