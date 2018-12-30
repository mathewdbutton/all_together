defmodule AllTogetherWeb.PageController do
  use AllTogetherWeb, :controller
  alias AllTogether.{Repo, Recording}

  def index(conn, _params) do
    render(conn, "index.html")
  end

end
