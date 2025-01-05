using UnityEngine;

public class PlayerDragHandler : MonoBehaviour
{
    public float dragFactor = 1f;

    private Rigidbody rb;

    private void Awake()
    {
        rb = GetComponent<Rigidbody>();
    }

    private void FixedUpdate()
    {
        if (!IsGrounded())
        {
            rb.drag = dragFactor;
        }
        else
        {
            rb.drag = 0;
        }
    }

    private bool IsGrounded()
    {
        return Physics.Raycast(transform.position, Vector3.down, 0.1f);
    }
}
