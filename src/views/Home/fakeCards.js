import React from 'react';
import { GroupCardContainer } from 'common/components';
import { GroupCard } from 'common/containers';

export default (
  <GroupCardContainer>
    <GroupCard
      id="yo"
      key="yo"
      admin={{
        avatarUrl:
          'https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.100.100/p100x100/10313481_10202884716391052_1773745466201438542_n.jpg?oh=c08ef6970534a22e6fe3f6e4d9e353d3&oe=5AF03ADD',
        displayName: 'Quentin Bross',
      }}
      stations={{
        departure: 'Lyon Part-Dieu',
        arrival: 'Geneve Cornavin',
      }}
      dateTime="2018-01-01"
      members={{
        current: 1,
        target: 7,
      }}
      info="Do labore sit dolore adipisicing nisi nostrud. Sint consectetur ut ipsum sit anim laborum consectetur ea in reprehenderit ad."
    />
    <GroupCard
      id="yoo"
      key="yoo"
      admin={{
        avatarUrl:
          'https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.100.100/p100x100/10313481_10202884716391052_1773745466201438542_n.jpg?oh=c08ef6970534a22e6fe3f6e4d9e353d3&oe=5AF03ADD',
        displayName: 'Quentin Bross',
      }}
      stations={{
        departure: 'Lyon Part-Dieu',
        arrival: 'Geneve Cornavin',
      }}
      dateTime="2018-01-01"
      members={{
        current: 1,
        target: 7,
      }}
      info="Do labore sit dolore adipisicing nisi nostrud. Sint consectetur ut ipsum sit anim laborum consectetur ea in reprehenderit ad."
      requestState="pending"
    />
    <GroupCard
      id="yooo"
      key="yooo"
      admin={{
        avatarUrl:
          'https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.100.100/p100x100/10313481_10202884716391052_1773745466201438542_n.jpg?oh=c08ef6970534a22e6fe3f6e4d9e353d3&oe=5AF03ADD',
        displayName: 'Quentin Bross',
      }}
      stations={{
        departure: 'Lyon Part-Dieu',
        arrival: 'Geneve Cornavin',
      }}
      dateTime="2018-01-01"
      members={{
        current: 1,
        target: 7,
      }}
      info="Do labore sit dolore adipisicing nisi nostrud. Sint consectetur ut ipsum sit anim laborum consectetur ea in reprehenderit ad."
      requestState="confirmed"
    />
    <GroupCard
      id="yoooo"
      key="yoooo"
      admin={{
        avatarUrl:
          'https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.100.100/p100x100/10313481_10202884716391052_1773745466201438542_n.jpg?oh=c08ef6970534a22e6fe3f6e4d9e353d3&oe=5AF03ADD',
        displayName: 'Quentin Bross',
      }}
      stations={{
        departure: 'Lyon Part-Dieu',
        arrival: 'Geneve Cornavin',
      }}
      dateTime="2018-01-01"
      members={{
        current: 1,
        target: 7,
      }}
      info="Do labore sit dolore adipisicing nisi nostrud. Sint consectetur ut ipsum sit anim laborum consectetur ea in reprehenderit ad."
      requestState="refused"
    />
  </GroupCardContainer>
);
