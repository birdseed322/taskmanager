class ChangeDataTypeForEst < ActiveRecord::Migration[7.0]
  def change
    change_column :notes, :est, :integer
  end
end
