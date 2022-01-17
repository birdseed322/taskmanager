class NotesController < ApplicationController
  before_action :set_note, only: [:show, :edit, :update, :destroy]

  def home
    
  end

  def index
    @notes = Note.all
    render json: @notes

  end
  
  def new

  end

  def edit

  end

  def create
  
  end

  def show
    if @note
      render json: @note
    else 
      render json: @note.errors
    end
  end

  def update

  end

  def destroy

  end

  private

    def set_note
      @note = Note.find(params[:id])
    end

    def note_params
      params.permit(:title, :desc, :subtask, :duedate, :est)
    end

end
