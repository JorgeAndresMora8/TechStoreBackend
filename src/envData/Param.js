import ParsedArgs from "minimist"

const configParams = ParsedArgs(process.argv.slice(2), { 
    default:{p:8080, DB:"local"}, 
    alias:{p:"PORT", DB:"DATABASE"}
})

export const SERVER_PORT = process.env.PORT || configParams.PORT 
export const SERVER_DB = configParams.DATABASE