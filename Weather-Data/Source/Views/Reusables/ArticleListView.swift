//
//  ArticleListView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 23/12/2024.
//


import SwiftUI

/// A reusable view that displays a list of articles fetched for a specific topic.
struct ArticleListView: View {
    @ObservedObject var viewModel: ArticleListViewModel

    var body: some View {
        VStack {
            if viewModel.isLoading {
                ProgressView("Loading articles...")
            } else if let errorMessage = viewModel.errorMessage {
                Text(errorMessage)
                    .foregroundColor(.red)
                    .multilineTextAlignment(.center)
            } else if $viewModel.articles.isEmpty {
                Text("No articles found.")
                    .foregroundColor(.gray)
                    .font(.footnote)
            } else {
                List(viewModel.articles) { article in
                    VStack(alignment: .leading) {
                        Text(article.title)
                            .font(.body)
                            .bold()
                        Link("Read More", destination: URL(string: article.link)!)
                            .foregroundColor(.blue)
                    }
                    .padding(.vertical, 5)
                }
            }
        }
    }
}

#Preview{
    ArticleListView(viewModel: ArticleListViewModel())
}
