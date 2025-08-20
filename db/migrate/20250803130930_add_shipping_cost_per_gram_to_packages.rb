class AddShippingCostPerGramToPackages < ActiveRecord::Migration[8.0]
  def change
    add_column :packages, :shipping_cost_per_gram, :decimal
  end
end
