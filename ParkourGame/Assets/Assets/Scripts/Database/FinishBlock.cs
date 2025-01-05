using UnityEngine;

public class FinishBlock : MonoBehaviour
{
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            FindObjectOfType<ParkourTimer>().StopTimer();
        }
    }
}
