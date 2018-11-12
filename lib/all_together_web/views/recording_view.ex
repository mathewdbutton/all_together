defmodule AllTogetherWeb.RecordingView do
  use AllTogetherWeb, :view


    def render("create.json", %{create: create}) do
      %{ }
    end

    def render("upload_url.json", %{upload: upload, uuid: uuid}) do
      {:ok, results} = upload
      %{ upload_url: results, uuid: uuid }
    end
end
