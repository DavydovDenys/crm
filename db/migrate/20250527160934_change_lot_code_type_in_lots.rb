class ChangeLotCodeTypeInLots < ActiveRecord::Migration[8.0]
  def change
    change_column :lots, :code, :string, null: false
  end
end
