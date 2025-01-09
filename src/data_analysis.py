import pandas as pd
import matplotlib.pyplot as plt

# Data inladen
def load_data(file_path):
    """Laad data vanuit een CSV-bestand."""
    try:
        data = pd.read_csv(file_path)
        print("Data succesvol geladen.")
        return data
    except FileNotFoundError:
        print("Bestand niet gevonden.")
    except pd.errors.EmptyDataError:
        print("Bestand is leeg.")
    return None

# Data analyseren en visualiseren
def plot_trends(data, keyword):
    """Visualiseer trends van een specifiek keyword."""
    try:
        if keyword not in data.columns:
            raise KeyError(f"Keyword '{keyword}' niet gevonden in dataset.")

        plt.figure(figsize=(10, 6))
        plt.plot(data['date'], data[keyword], marker='o', linestyle='-', color='b', label=keyword)
        plt.xlabel('Datum')
        plt.ylabel('Populariteit')
        plt.title(f'Trend voor: {keyword}')
        plt.legend()
        plt.grid(True)
        plt.xticks(rotation=45)
        plt.tight_layout()

        # Opslaan van grafiek
        plt.savefig(f'plots/{keyword}_trend.png')
        print(f"Grafiek opgeslagen: plots/{keyword}_trend.png")
        plt.show()
    except KeyError as e:
        print(e)
    except Exception as e:
        print(f"Er is een fout opgetreden: {e}")

# Test functionaliteit
if __name__ == "__main__":
    file_path = 'data/cleaned_data.csv'
    data = load_data(file_path)

    if data is not None:
        plot_trends(data, 'sport')
