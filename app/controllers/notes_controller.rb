class NotesController < ApplicationController
  before_action :set_note, only: [:show, :edit, :update, :destroy]
  protect_from_forgery with: :null_session
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
    newNote = Note.new(note_params)
    newNote.save
    render json: {status: "Ok!"}
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
    @note.destroy
    render json: {status: "Ok!"}
  end

  private

    def set_note
      @note = Note.find(params[:id])
    end
    
    def note_params
      params.require(:note).permit(:title, :desc, {:subtask => []}, :duedate, :est)
    end

end
