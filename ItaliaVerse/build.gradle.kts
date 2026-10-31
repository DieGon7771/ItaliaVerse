// use an integer for version numbers
version = 2


cloudstream {
    // All of these properties are optional, you can safely remove them

    description = "Questo Plugin aggiunge tutti i Repository Italiani"
    authors = listOf("DieGon")

    /**
    * Status int as the following:
    * 0: Down
    * 1: Ok
    * 2: Slow
    * 3: Beta only
    * */
    status = 1

    tvTypes = listOf("Others")

    requiresResources = false
    language = "it"

    iconUrl = ""
}


dependencies {
    compileOnly("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.1")
}