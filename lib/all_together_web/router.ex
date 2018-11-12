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
  end

  scope "/", AllTogetherWeb do
    pipe_through :api
    post "/record", RecordingController, :create
    post "/upload_url", RecordingController, :upload_url
  end
end
