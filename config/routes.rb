Rails.application.routes.draw do
  resources :reviews
  resources :items
  resources :cart_items, except: [:update]
  resources :carts
  resources :users, only: [:create, :index, :show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  patch "/cart_items", to: "cart_items#update"
  
  post '/login', to: 'sessions#login'
  delete "/logout", to: "sessions#logout"
  get "/users", to: "users#show"
  post "/signup", to: "users#create"

end
