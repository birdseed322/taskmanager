Rails.application.routes.draw do
    root 'notes#home'
    resources :notes
    get '/display_note/:id', to: 'notes#display_note'

end
