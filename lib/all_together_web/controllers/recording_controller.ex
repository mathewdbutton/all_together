defmodule AllTogetherWeb.RecordingController do
  use AllTogetherWeb, :controller
  alias AllTogether.{Repo, Recording}

  import Ecto

  def create(conn, %{"name" => name, "path" => path}) do
    Repo.insert(%Recording{path: path, name: name})
    render conn, create: "create"
  end

  def upload_url(conn, %{"file_name" => name}) do
    uuid = Ecto.UUID.generate
    url = ExAws.S3.presigned_url(ExAws.Config.new(:s3, []), :put, "all-together-now", uuid <> name)
    render conn, upload: url, uuid: uuid
  end

end
