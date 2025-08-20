class AddAdditionalFieldsToLots < ActiveRecord::Migration[8.0]
  def change
    add_column :lost, :country_shipping_costs, :decimal, null: true
    add_column :lost, :country_fee, :decimal, null: true
    add_column :lost, :service_fee, :decimal
    add_column :lost, :weight, :integer
    add_column :lost, :name, :string
    add_column :lost, :price, :decimal
    add_column :lost, :total_price, :decimal
  end
end
