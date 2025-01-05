using UnityEngine;

public class PlayerInput : MonoBehaviour
{
    public float GetHorizontalInput()
    {
        return Input.GetAxis("Horizontal");
    }

    public float GetVerticalInput()
    {
        return Input.GetAxis("Vertical");
    }

    public bool IsSprinting()
    {
        return Input.GetKey(KeyCode.LeftShift);
    }

    public bool IsJumping()
    {
        return Input.GetKeyDown(KeyCode.Space);
    }

    public float GetMouseX()
    {
        return Input.GetAxis("Mouse X");
    }

    public float GetMouseY()
    {
        return Input.GetAxis("Mouse Y");
    }
}
