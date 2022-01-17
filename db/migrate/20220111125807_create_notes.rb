class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.string :title
      t.text :desc
      t.text :subtask
      t.date :duedate
      t.date :est

      t.timestamps
    end
  end
end
