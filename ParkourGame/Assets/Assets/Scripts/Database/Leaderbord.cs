using System.Collections.Generic;
using Firebase;
using Firebase.Database;
using Firebase.Extensions;
using TMPro;
using UnityEngine;
public class LeaderboardScript : MonoBehaviour
{
    public Transform leaderboardContent;
    public GameObject leaderboardEntryPrefab;

    private DatabaseReference reference;

    void Start()
    {
        FirebaseApp.CheckAndFixDependenciesAsync().ContinueWithOnMainThread(task =>
        {
            if (task.Result == DependencyStatus.Available)
            {
                reference = FirebaseDatabase.DefaultInstance.RootReference;
                LoadLeaderboard();
            }
            else
            {
                Debug.LogError("Firebase initialization failed: " + task.Result);
            }
        });
    }

    public void LoadLeaderboard()
    {
        reference.Child("parkour_times").OrderByValue().LimitToFirst(10).GetValueAsync().ContinueWithOnMainThread(task =>
        {
            if (task.IsCompleted)
            {
                DataSnapshot snapshot = task.Result;
                DisplayLeaderboard(snapshot);
            }
            else
            {
                Debug.LogError("Failed to load leaderboard: " + task.Exception);
            }
        });
    }

    private void DisplayLeaderboard(DataSnapshot snapshot)
    {
        // Clear any existing entries
        foreach (Transform child in leaderboardContent)
        {
            Destroy(child.gameObject);
        }

        foreach (var playerData in snapshot.Children)
        {
            string playerName = playerData.Key;
            string time = playerData.Value.ToString();
            AddLeaderboardEntry(playerName, time);
        }
    }

    private void AddLeaderboardEntry(string playerName, string time)
    {
        GameObject entry = Instantiate(leaderboardEntryPrefab, leaderboardContent);

        TMP_Text entryText = entry.GetComponent<TMP_Text>();

        entryText.text = $"{playerName} - {time} seconds";
    }
}