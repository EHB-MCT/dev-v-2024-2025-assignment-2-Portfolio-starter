using UnityEngine;

public interface IPlayerState
{
    void Enter();
    void Exit();
    void UpdateState(float deltaTime);
}
