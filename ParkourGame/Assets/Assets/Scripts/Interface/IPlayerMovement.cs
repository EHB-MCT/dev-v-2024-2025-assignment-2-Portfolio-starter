using UnityEngine;

public interface IPlayerMovement
{
    void Move(Vector2 input, float deltaTime);
    void Jump();
    void Sprint(bool isSprinting);
}
