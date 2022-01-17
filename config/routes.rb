Rails.application.routes.draw do
    root 'notes#home'
    resources :notes

end
