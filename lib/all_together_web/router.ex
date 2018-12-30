defmodule AllTogetherWeb.Router do
  use AllTogetherWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", AllTogetherWeb do
    pipe_through :browser
    get "/", PageController, :index
    resources "/songs", SongController
  end

  scope "/", AllTogetherWeb do
    pipe_through :api
    resources "/songs", SongController do
      post "/record", RecordingController, :create
    end
    
    post "/upload_url", RecordingController, :upload_url
  end
end
