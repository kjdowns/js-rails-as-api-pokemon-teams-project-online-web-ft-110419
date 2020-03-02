class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        trainer.pokemons.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
        render json: trainer.pokemons.last
    end

    def destroy
        Pokemon.destroy(params[:id])
        render json: {message: "Pokemon at ID #{params[:id]} has been deleted"}
    end

end
