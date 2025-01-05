using Firebase;
using Firebase.Database;
using Firebase.Extensions;
using UnityEngine;

public class FirebaseController : MonoBehaviour
{
    private DatabaseReference reference;

    private void Start()
    {
        FirebaseApp.CheckAndFixDependenciesAsync().ContinueWithOnMainThread(task =>
        {
            if (task.Result == DependencyStatus.Available)
            {
                FirebaseApp app = FirebaseApp.DefaultInstance;
                reference = FirebaseDatabase.DefaultInstance.RootReference;
                Debug.Log("Firebase initialized successfully.");
            }
            else
            {
                Debug.LogError("Firebase initialization failed: " + task.Result);
            }
        });
    }

    public void SendTimeToFirebase(string playerId, float timeElapsed)
    {
        string timeData = timeElapsed.ToString();
        reference.Child("parkour_times").Child(playerId).SetValueAsync(timeData);
    }
}
