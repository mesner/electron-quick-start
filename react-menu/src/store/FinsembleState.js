import { useStateValue } from './StateProvider';

export const useFinsembleState = () => {

  const [state, dispatch] = useStateValue();

  return [
    {
      getCounter() {
        return state.counter;
      },
      getShowWindowPortal() {
        return state.showWindowPortal;
      },
      getReady() {
        return state.ready;
      }
    },
    {
      incrementCounter() {
        dispatch({type:'incrementCounter'});
      },
      toggleWindowPortal() {
        dispatch({type:'toggleWindowPortal'});
      },
      finsembleReady() {
        dispatch({type:'finsembleReady'});
      }
    }
  ]
}



