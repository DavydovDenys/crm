class AllowNullPackageIdOnLots < ActiveRecord::Migration[8.0]
  def change
    change_column_null :lots, :package_id, true
  end
end
