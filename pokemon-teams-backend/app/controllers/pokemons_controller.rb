class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find(params[:trainer_id])
        if(trainer.pokemon.length < 6)
            pokemonData = {
                nickname: Faker::Name.first_name,
                species: Faker::Games::Pokemon.name
            }
            pokemon = trainer.pokemon.create(pokemonData)
            render json: pokemon
        else
            render json: { message: "This trainer already has six pokemon." }
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemon
    end
end
