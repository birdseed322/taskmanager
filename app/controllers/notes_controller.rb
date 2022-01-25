class NotesController < ApplicationController
  before_action :set_note, only: [:show, :edit, :update, :destroy]
  protect_from_forgery with: :null_session
  #Handle get request to root
  def home
    
  end

  #Handle get request to specific task page
  def display_note
  end

  #Returns all the notes to API get request
  def index
    @notes = Note.all
    render json: @notes

  end

  #Handles creation of new tasks. Takes in body of POST request as parameters to create new tasks
  def create
    newNote = Note.new(note_params)
    newNote.save
    render json: {status: "Ok!"}
  end

  #Returns information of specific task
  def show
    if @note
      render json: @note
    else 
      render json: @note.errors
    end
  end
  
  #Updates information of task using body of PATCH request
  def update
    @note.update(note_params)
    render json:{status: "Ok!"}
  end

   #Handles deletion of tasks
  def destroy
    @note.destroy
    render json: {status: "Ok!"}
  end

  private

     #Predefined method to handle repeated note querying 
    def set_note
      @note = Note.find(params[:id])
    end
    
    #Predefined method to ease accessing information from the body of requests
    def note_params
      params.require(:note).permit(:title, :desc, {:subtask => []}, :duedate, :est)
    end

end
