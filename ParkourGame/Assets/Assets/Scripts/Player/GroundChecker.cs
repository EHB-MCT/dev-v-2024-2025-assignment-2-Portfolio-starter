using UnityEngine;

public class GroundChecker : MonoBehaviour
{
    private bool isGrounded;

    public float groundCheckDistance = 0.2f;

    public bool IsGrounded()
    {
        RaycastHit hit;
        return Physics.Raycast(transform.position, Vector3.down, out hit, groundCheckDistance);
    }

    private void Update()
    {
        isGrounded = IsGrounded();
    }

    public bool GetGroundedStatus()
    {
        return isGrounded;
    }
}
