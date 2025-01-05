using UnityEngine;

public class ParkourTimer : MonoBehaviour
{
    private float timeElapsed = 0f;
    private bool isTimerRunning = false;
    public FirebaseController firebaseController;

    private void Start()
    {
        firebaseController = FindObjectOfType<FirebaseController>();
        if (firebaseController == null)
        {
            Debug.LogError("FirebaseController not found in the scene!");
        }
    }

    public void StartTimer()
    {
        isTimerRunning = true;
        timeElapsed = 0f;
        Debug.Log("Timer Started");
    }

    public void StopTimer()
    {
        isTimerRunning = false;
        SendTimeToFirebase(timeElapsed);
        Debug.Log("Elapsed time" + timeElapsed);
    }

    private void Update()
    {
        if (isTimerRunning)
        {
            timeElapsed += Time.deltaTime;
        }
    }

    private void SendTimeToFirebase(float timeElapsed)
    {
        FirebaseController firebaseController = FindObjectOfType<FirebaseController>();
        string playerId = "Player";
        firebaseController.SendTimeToFirebase(playerId, timeElapsed);
    }
}
