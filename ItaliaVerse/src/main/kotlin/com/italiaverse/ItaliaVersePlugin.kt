package com.italiaverse

import android.content.Context
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ObjectNode
import com.fasterxml.jackson.databind.node.TextNode
import com.fasterxml.jackson.module.kotlin.treeToValue
import com.lagradost.cloudstream3.app
import com.lagradost.cloudstream3.mapper
import com.lagradost.cloudstream3.plugins.CloudstreamPlugin
import com.lagradost.cloudstream3.plugins.Plugin
import com.lagradost.cloudstream3.plugins.RepositoryManager
import com.lagradost.cloudstream3.ui.settings.extensions.RepositoryData
import com.lagradost.cloudstream3.utils.Coroutines.ioSafe

@CloudstreamPlugin
class ItaliaVersePlugin : Plugin() {

    override fun load(context: Context) {
        ioSafe {
            addRepositories(getRepositories())
        }
    }

    private suspend fun addRepositories(repositories: List<String>) {
        val added = RepositoryManager.getRepositories()
        repositories.forEach { url ->
            if (added.any { it.url == url }) return@forEach

            val repo = RepositoryManager.parseRepository(url)
            val name = repo?.name ?: "No name"
            try {
                RepositoryManager.addRepository(RepositoryData(repo?.iconUrl, name, url))
            } catch (_: Throwable) {
                RepositoryManager.addRepository(RepositoryData(name, url))
            }
        }
    }

    private suspend fun getRepositories(): List<String> {
        data class VerifiedRepo(
            val url: String? = null,
            val verified: Boolean? = null
        )

        val text = app.get(REPOSITORIES_URL).text

        return ObjectMapper().readTree(text).mapNotNull {
            when (it) {
                is TextNode -> mapper.treeToValue<String>(it)
                is ObjectNode -> mapper.treeToValue<VerifiedRepo>(it).url
                else -> null
            }
        }
    }

    private companion object {
        const val REPOSITORIES_URL = "https://pastebin.com/raw/k85W8BYU"
    }
}
