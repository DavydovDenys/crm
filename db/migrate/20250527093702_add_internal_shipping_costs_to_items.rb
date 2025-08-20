class AddInternalShippingCostsToItems < ActiveRecord::Migration[8.0]
  def change
    add_column :items, :internal_shipping_costs, :decimal
  end
end
