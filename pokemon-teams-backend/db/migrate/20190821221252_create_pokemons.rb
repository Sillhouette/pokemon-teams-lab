class CreatePokemons < ActiveRecord::Migration[5.2]
  def change
    create_table :pokemons do |t|
      t.string :species
      t.string :nickname
      t.references :trainer, foreign_key: true

      t.timestamps
    end
  end
end
