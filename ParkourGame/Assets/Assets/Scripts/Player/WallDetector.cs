using UnityEngine;

public interface IWallDetector
{
    bool IsNearWall();
}

public class WallDetector : MonoBehaviour, IWallDetector
{
    public float wallDetectionRange = 0.5f;
    public LayerMask wallLayer;

    public bool IsNearWall()
    {
        RaycastHit hit;
        if (Physics.Raycast(transform.position, transform.forward, out hit, wallDetectionRange, wallLayer))
        {
            return true;
        }
        return false;
    }
}
