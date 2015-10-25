module.exports =
  activate: ->
    ( require "atom-package-deps" ).install "linter-gadkod"

  provideLinter: ->
    require "./linter.coffee"
