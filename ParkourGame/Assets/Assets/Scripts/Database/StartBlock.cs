using UnityEngine;

public class StartBlock : MonoBehaviour
{
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            FindObjectOfType<ParkourTimer>().StartTimer();
        }
    }
}
