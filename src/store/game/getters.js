const GetMyData = function(state) {
  return (id) => {
    const p = state.players.filter((player) => player.id === id)[0];
    if (p) {
      return p;
    }
    return {};
  };
};

const myEnemyData = function(state) {
  return (id) => {
    const p = state.players.filter((player) => player.id !== id)[0];
    if (p) {
      return p;
    }
    return {};
  };
};

const getMyCharList = function(state) {
  return (id) => {
    let charList = [];
    state.characters.forEach((char) => {
      if (char.belongs[id]) charList.push(char);
      else charList.push(false);
    });
    return charList;
  };
};

const getEnemyCharList = function(state) {
  return (id) => {
    let charList = [];
    state.characters.forEach((char) => {
      if (!char.belongs[id]) charList.push(char);
      else charList.push(false);
    });
    return charList;
  };
};

const getBattleRoom = function(state) {
  return state.room;
};

const getTempQueue = function(state) {
  return state.tempQueue;
};

const getSkillQueueById = function(state) {
  return (id, playerId) => {
    const filtered = filterQueue(state.skillQueue, state, id, playerId);
    for (const note of state.characters[id].notifications) {
      upsert(note, filtered);
    }
    return filtered;
  };
};

const getTempQueueByCharacter = function(state) {
  return (index) => {
    return state.tempQueue.filter((s) => {
      return s.targets.includes(index);
    });
  };
};

const getCharacterByIndex = function(state) {
  return (index) => {
    return state.characters[index];
  };
};

const getSkillByCaster = function(state) {
  return (caster, skill) => {
    return state.characters[caster].skills[skill];
  };
};

const isBusy = function(state) {
  return state.isBusy;
};

const isLive = function(state) {
    return state.isLive
}

const turnStatus = function(state) {
  return state.turnEnded
}

export default {
  isBusy,
  isLive,
  myEnemyData,
  GetMyData,
  getBattleRoom,
  getCharacterByIndex,
  getEnemyCharList,
  getMyCharList,
  getSkillByCaster,
  getSkillQueueById,
  getTempQueue,
  getTempQueueByCharacter,
  turnStatus
};

function findCharacterById(characters, id) {
  for (const char of characters) {
    if (char.id === id) return char;
  }
}

function filterQueue(queue, state, id, playerId) {
  const rememberMe = {};
  const filtered = [];
  queue.forEach((s) => {
    const arr = [];

    for (const effect of s.effects) {
      if (effect.targets.includes(id)) {
        const caster = findCharacterById(state.characters, effect.caster);
        if (effect.isInvisible && !caster.belongs[playerId]) continue;
        arr.push({
          message: effect.message,
          duration: effect.infinite || Math.floor(effect.duration / 2),
        });
      }
    }

    const results = {
      id: s.id,
      skillpic: s.skillpic,
      skillName: s.name,
      tips: arr,
      notifications: [],
    };
    const string = JSON.stringify(results);
    if (!rememberMe[string]) {
      if (arr.length > 0) {
        results.stack = 1;
        filtered.push(results);
        rememberMe[string] = results;
      }
    } else {
      rememberMe[string].stack += 1;
    }
  });

  return filtered;
}

function upsert(note, skill) {
  let found = false;
  for (let i = 0; i < skill.length; i++) {
    const tip = skill[i];
    if (tip.id === note.id) {
      tip.notifications.push(note.msg);
      found = true;
      break;
    }
  }

  if (!found) {
    skill.push({
      id: note.id,
      skillName: note.skillName,
      skillpic: note.skillpic,
      tips: [],
      notifications: [note.msg],
    });
  }
}
