class ApplicationController < ActionController::Base
    # Allow React app to make API calls
    protect_from_forgery with: :null_session
end
